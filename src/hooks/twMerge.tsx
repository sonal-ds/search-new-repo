import { extendTailwindMerge } from "tailwind-merge";


export const twMerge = extendTailwindMerge({
  classGroups: {
    form: [
      "input",
      "checkbox",
      "textarea",
      "select",
      "multiselect",
      "radio",
    ].map((v) => "form-" + v),
  },
});




