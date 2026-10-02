import { Success } from '@/design-system/screen-components';
import { useScreenNavigation } from '@/design-system/screen-navigation';

export default function SuccessRoute() {
  const go = useScreenNavigation();
  return <Success go={go} />;
}
