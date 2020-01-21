// Just for desktop, we show inbox and conversation side by side
import * as React from 'react'
import * as Kb from '../common-adapters'
import Inbox from './inbox/container'
import InboxSearch from './inbox-search/container'
import Conversation from './conversation/container'
import Header from './header.desktop'
import InfoPanel from './conversation/info-panel/container'
import * as Container from '../util/container'

type Props = {
  navigation?: any
}

const InboxAndConversation = (props: Props) => {
  const inboxSearch = Container.useSelector(state => state.chat2.inboxSearch)
  const infoPanelShowing = Container.useSelector(state => state.chat2.infoPanelShowing)

  return (
    <Kb.Box2 direction="horizontal" fullWidth={true} fullHeight={true}>
      {inboxSearch ? <InboxSearch /> : <Inbox />}
      <Conversation navigation={props.navigation} />
      {infoPanelShowing && <InfoPanel />}
    </Kb.Box2>
  )
}

InboxAndConversation.navigationOptions = {
  header: undefined,
  headerTitle: Header,
}

const Memoed = React.memo(InboxAndConversation)
Container.hoistNonReactStatic(Memoed, InboxAndConversation)
export default Memoed
