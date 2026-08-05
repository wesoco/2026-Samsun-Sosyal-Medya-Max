import "react";

declare module "react" {
  interface FormHTMLAttributes<T> {
    /** WebMCP declarative tool name */
    toolname?: string;
    /** WebMCP declarative tool description */
    tooldescription?: string;
  }
}

export {};
