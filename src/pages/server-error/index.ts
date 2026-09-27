import Handlebars from "handlebars";
import { ServerErrorPage as template } from "./ui";

export const ServerErrorPage = Handlebars.compile(template);
