import * as React from "react";
import RtfConverter from "@yext/rtf-converter";

const FormatDirectAnswers = (props: any) => {
  const answersPremString: string = props?.toString();
  return (
    <div
      className="post-inner-content"
      dangerouslySetInnerHTML={{
        __html: RtfConverter.toHTML(answersPremString),
      }}
    />
  );
};

export default FormatDirectAnswers;
