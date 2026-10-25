import Handlebars from "handlebars";

type EventListType = Partial<Record<keyof HTMLElementEventMap, (e: Event) => void>>;

interface BlockOwnProps {
  __children?: Array<{
    component: Block<object>;
    embed(node: DocumentFragment): void;
  }>;
  __refs?: Record<string, Element>;
}

export abstract class Block<Props extends object> {
  constructor(props: Props = {} as Props) {
    this.props = props;
  } 

  protected abstract template: string

  protected props = {} as Props & BlockOwnProps

  private domElement: Element | null = null

  protected events: EventListType = {}; 

  protected refs: Record<string, Element> = {};
  protected children: Block<object>[] = [];
  static componentName: string


  private compile() {
    const html = Handlebars.compile(this.template)(this.props);

    const templateElement = document.createElement("template");
    templateElement.innerHTML = html;
    const fragment = templateElement.content;

    if (this.props.__children) {
      this.children = this.props.__children.map((child) => child.component);

      // вложенные компоненты регистрируются раньше родителя,
      // поэтому родитель должен оказаться во фрагменте первым
      [...this.props.__children].reverse().forEach((child) => {
        child.embed(fragment);
      });
    }

    const defaultRefs = this.props?.__refs ?? {};
    this.refs = Array.from(fragment.querySelectorAll("[ref]")).reduce(
      (list, element) => {
        const key = element.getAttribute("ref") as string;
        list[key] = element as HTMLElement;
        element.removeAttribute("ref");
        return list;
      },
      defaultRefs
    );

    return templateElement.content.firstElementChild;
  } 

  protected componentDidMount() {

  }

  private mountComponent() {
    this.attachListeners()
    this.componentDidMount()
  }

  protected componentWillUnmount() {
}

  private unmountComponent() {
    if (this.domElement) {
      [...this.children].reverse().forEach(child => child.unmountComponent());
      this.componentWillUnmount();
      this.removeListeners();
    }
  }

  private attachListeners() {
    for (const eventName in this.events) {
      const eventCallback = this.events[eventName as keyof HTMLElementEventMap];
      if (typeof eventCallback == "function" && this.domElement) {
        this.domElement.addEventListener(eventName, eventCallback);
      }
    }
  } 

  private removeListeners() {
    for (const eventName in this.events) {
      const eventCallback = this.events[eventName as keyof HTMLElementEventMap];
      if (typeof eventCallback === "function" && this.domElement) {
        this.domElement.removeEventListener(eventName, eventCallback);
      }
    }
} 

  protected render() {
    this.unmountComponent()
    const fragment = this.compile();

    if (this.domElement && fragment) {
      this.domElement.replaceWith(fragment);
    }

    this.domElement = fragment;
    this.mountComponent()
  }

  public destroy() {
    this.unmountComponent();
  }

  public element(): Element | null {
    if (!this.domElement) {
      this.render();
    }

    return this.domElement;
  } 
  
  protected componentDidUpdate(_oldProps: Props, _newProps: Props): boolean {
    return true;
  }

  public setProps(props: Partial<Props>) {
    const oldProps = this.props;
    const newProps = { ...this.props, ...props };

    if (!this.componentDidUpdate(oldProps, newProps)) {
      this.props = newProps;
      return;
    }

    this.props = { ...newProps, __children: [], __refs: {} };
    this.render();
  }
}