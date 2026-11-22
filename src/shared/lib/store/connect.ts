import type { Block } from "../block";
import { isEqual, type Indexed } from "../utils";
import { store } from "./store";

interface BlockClass<P extends object> {
  new (props: P): Block<P>;
  componentName: string;
}

export function connect<StateProps extends object>(mapStateToProps: (state: Indexed) => StateProps) {
  return function <P extends object>(Component: BlockClass<P>) {
    return class extends Component {
      declare protected template: string;

      private stateProps: StateProps;

      private unsubscribe: (() => void) | null = null;

      constructor(props: Omit<P, keyof StateProps>) {
        const stateProps = mapStateToProps(store.getState());

        super({ ...props, ...stateProps } as unknown as P);

        this.stateProps = stateProps;
      }

      protected override componentDidMount() {
        super.componentDidMount();

        this.unsubscribe = store.subscribe(() => {
          const stateProps = mapStateToProps(store.getState());

          if (isEqual(this.stateProps, stateProps)) {
            return;
          }

          this.stateProps = stateProps;
          this.setProps(stateProps);
        });
      }

      protected override componentWillUnmount() {
        this.unsubscribe?.();
        this.unsubscribe = null;

        super.componentWillUnmount();
      }
    };
  };
}
