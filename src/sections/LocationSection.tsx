import * as React from 'react';
import LocationResults from '../components/LocationResults';
import { LocationProvider } from '../components/LocationContext';
import { CompositionMethod, SectionConfig } from '../components/interface/interface';
import { SectionComponent } from '@yext/search-ui-react';

//prettier-ignore
interface LocationSectionCssClasses {
  section?: string
}

const builtInCssClasses: LocationSectionCssClasses = {
  section: '',
};

interface LocationSectionConfig extends SectionConfig {
  customCssClasses?: LocationSectionCssClasses,
  compositionmethod?: CompositionMethod
}

const LocationSection: SectionComponent = function (props: LocationSectionConfig): JSX.Element | null {
  const cssClasses = builtInCssClasses;
  const { results, cardConfig, header } = props;
  if (results.length === 0) {
    return null;
  }

  return (
    <LocationProvider>
      <section className={cssClasses.section}>
        {header}
        <LocationResults results={results} verticalKey="locations" cardConfig={cardConfig} />
      </section>
    </LocationProvider>
  );
};
export default LocationSection;