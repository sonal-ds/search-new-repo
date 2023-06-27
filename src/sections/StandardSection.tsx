import { VerticalResultsDisplay } from "../components/search/VerticalResults";
import { SectionComponent, useComposedCssClasses } from "@yext/search-ui-react";
import * as React from "react";
import {
  CompositionMethod,
  SectionConfig,
} from "../components/interface/interface";

interface StandardSectionCssClasses {
  section?: string;
}

const builtInCssClasses: StandardSectionCssClasses = {
  section: "",
};

interface StandardSectionConfig extends SectionConfig {
  customCssClasses?: StandardSectionCssClasses;
  compositionmethod?: CompositionMethod;
}

const StandardSection: SectionComponent = function (
  props: StandardSectionConfig
): JSX.Element | null {
  const cssClasses = useComposedCssClasses(
    builtInCssClasses,
    props.customCssClasses
  );
  const { results, cardConfig, header } = props;

  if (results.length === 0) {
    return null;
  }
  const cardComponent = cardConfig?.CardComponent;

  return (
    <section className={cssClasses.section}>
      {header}
      <VerticalResultsDisplay
        results={results}
        CardComponent={cardComponent}
        {...(cardConfig && { cardConfig })}
      />
    </section>
  );
};
export default StandardSection;
