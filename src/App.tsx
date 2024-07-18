import { useDContext } from '@dynamic-framework/ui-react';
import { useEffect, useMemo } from 'react';

import Init from './components/Init';
import NewTeamMember from './components/NewTeamMember';
import Users from './components/Users';
import { CONTEXT_CONFIG, WIDGET_STEPS } from './config/widgetConfig';
import useCountriesEffect from './services/hooks/useCountriesEffect';
import useCountriesPhoneEffect from './services/hooks/useCountriesPhoneEffect';
import { useAppSelector } from './store/hooks';
import { getWidgetStep } from './store/selectors';

const VIEW_STEP = {
  [WIDGET_STEPS.init]: Init,
  [WIDGET_STEPS.list]: Users,
  [WIDGET_STEPS.edition]: NewTeamMember,
};

export default function App() {
  const { setContext } = useDContext();
  const step = useAppSelector(getWidgetStep);

  useCountriesEffect();
  useCountriesPhoneEffect();

  const CurrentStep = useMemo(
    () => VIEW_STEP[step],
    [step],
  );

  useEffect(() => {
    setContext(CONTEXT_CONFIG);
  }, [setContext]);

  return (
    <div className="container pt-3 pb-8">
      <CurrentStep />
    </div>
  );
}
