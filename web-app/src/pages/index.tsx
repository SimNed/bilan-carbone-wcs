import { PageLayout } from '@/components/Layout/Layout.styled';
import { TitleView } from '@/components/TitleView/TitleView';
import BaselineView from './home_page/components/Baseline/Baseline';
import ContentView from './home_page/view/ContentView';

export default function HomePage() {
  return (
    <>
      <PageLayout>
        <TitleView>Wild Carbon</TitleView>
        <BaselineView />
        <ContentView />
      </PageLayout>
    </>
  );
}
