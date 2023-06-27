import { useSearchState, DirectAnswerType } from "@yext/search-headless-react";
import { ReactNode } from "react";
import * as React from "react";
import FormatDirectAnswers from "./FormatDirectAnswers";
import { encode, decode } from "html-entities";

export default function DirectAnswer(): JSX.Element | null {
  // const directAnswerResult = useSearchState(
  //   (state) => state.directAnswer.result
  // );
  // if (!directAnswerResult) {
  //   return null;
  // }

  const newDirectAnswer = useSearchState(
    (state) => state.directAnswer.result?.snippet.value
  );
  // console.log(newDirectAnswer, "newDirectAnswer");

  // const title: string =
  //   directAnswerResult.type === DirectAnswerType.FeaturedSnippet
  //     ? directAnswerResult?.value
  //     : `${directAnswerResult.entityName} / ${directAnswerResult.fieldName}`;

  // const description: ReactNode =
  //   directAnswerResult.type === DirectAnswerType.FeaturedSnippet
  //     ? FormatDirectAnswers(directAnswerResult.snippet.value)
  //     : directAnswerResult.fieldType == "address"
  //       ? `${directAnswerResult?.value?.line1},${directAnswerResult.value.city},
  //     ${directAnswerResult?.value?.region},
  //     ${directAnswerResult?.value?.postalCode},
  //     ${directAnswerResult?.value?.countryCode}`
  //       : directAnswerResult?.value;
  const result = newDirectAnswer?.replace(/\s+/g, " "); //encode(newDirectAnswer);
  // result = decode(result, { level: "html5" });
  console.log("result------", result);

  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-sm mb-6">
      <div className="mt-4" dangerouslySetInnerHTML={{ __html: result }} />
      {/* {description && <div className="font-bold text-xl text-neutral-dark">{description}</div>} */}
      {/* </div> */}
    </div>
  );
}
