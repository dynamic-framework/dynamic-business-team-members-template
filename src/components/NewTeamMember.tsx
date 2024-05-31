import { DStepper } from '@dynamic-framework/ui-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { CREATION_STEPS } from '../config/widgetConfig';
import { useAppSelector } from '../store/hooks';
import { getCreationStep } from '../store/selectors';

import Overview from './Overview';
import RoleAssignment from './RoleAssignment';
import TeamMemberInformation from './TeamMemberInformation';

const VIEW_STEP = {
  [CREATION_STEPS.role]: {
    Render: RoleAssignment,
    step: 1,
  },
  [CREATION_STEPS.add]: {
    Render: TeamMemberInformation,
    step: 2,
  },
  [CREATION_STEPS.overview]: {
    Render: Overview,
    step: 3,
  },
};

export default function NewTeamMember() {
  const step = useAppSelector(getCreationStep)!;
  const { t } = useTranslation();

  const STEPPER_OPTIONS = [
    {
      label: t('steps.role'),
      value: VIEW_STEP[CREATION_STEPS.role].step,
    },
    {
      label: t('steps.creation'),
      value: VIEW_STEP[CREATION_STEPS.add].step,
    },
    {
      label: t('steps.overview'),
      value: VIEW_STEP[CREATION_STEPS.overview].step,
    },
  ];

  const CurrentStep = useMemo(
    () => VIEW_STEP[step],
    [step],
  );

  return (
    <div className="d-flex flex-column gap-4">
      <div className="col-12 col-md-8 offset-md-2">
        <DStepper
          className="mt-5 w-100"
          currentStep={CurrentStep.step}
          options={STEPPER_OPTIONS}
          breakpoint="sm"
        />
      </div>
      <CurrentStep.Render />
    </div>
  );
}
