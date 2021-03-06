import * as React from 'react'
import * as Kb from '../../common-adapters'
import * as Types from '../../constants/types/teams'
import * as Styles from '../../styles'
import TeamTabs from './tabs/container'
import {Row} from './rows'
import renderRow from './rows/render'
import {TeamDetailsSubscriber} from '../subscriber'

export type Sections = Array<{data: Array<Row>; header?: Row; key: string}>

export type Props = {
  teamID: Types.TeamID
  selectedTab: string
  sections: Sections
  setSelectedTab: (arg0: Types.TabKey) => void
}

class Team extends React.Component<Props> {
  private renderItem = ({item}: {item: Row}) => {
    switch (item.type) {
      case 'tabs':
        return (
          <TeamTabs
            teamID={this.props.teamID}
            selectedTab={this.props.selectedTab}
            setSelectedTab={this.props.setSelectedTab}
          />
        )
      case 'settings':
      case 'header':
      case 'member':
      case 'bot':
      case 'bot-add':
      case 'invites-invite':
      case 'invites-request':
      case 'invites-divider':
      case 'invites-none':
      case 'subteam-intro':
      case 'subteam-add':
      case 'subteam-none':
      case 'subteam-subteam':
      case 'loading':
        return renderRow(item, this.props.teamID)
      default: {
        throw new Error(`Impossible case encountered in team page list: ${item}`)
      }
    }
  }

  private renderSectionHeader = ({section}) =>
    section.header ? this.renderItem({item: section.header}) : null

  render() {
    return (
      <Kb.Box style={styles.container}>
        <TeamDetailsSubscriber teamID={this.props.teamID} />
        <Kb.SectionList
          alwaysVounceVertical={false}
          renderItem={this.renderItem}
          renderSectionHeader={this.renderSectionHeader}
          stickySectionHeadersEnabled={Styles.isMobile}
          sections={this.props.sections}
          style={styles.list}
          contentContainerStyle={styles.listContentContainer}
        />
      </Kb.Box>
    )
  }
}

const styles = Styles.styleSheetCreate(() => ({
  container: {
    ...Styles.globalStyles.flexBoxColumn,
    alignItems: 'stretch',
    flex: 1,
    height: '100%',
    position: 'relative',
    width: '100%',
  },
  list: Styles.platformStyles({
    isElectron: {
      ...Styles.globalStyles.fillAbsolute,
      ...Styles.globalStyles.flexBoxColumn,
      alignItems: 'stretch',
    },
    isMobile: {
      ...Styles.globalStyles.fillAbsolute,
    },
  }),
  listContentContainer: Styles.platformStyles({
    isMobile: {
      display: 'flex',
      flexGrow: 1,
    },
  }),
}))

export default Team
