//@flow

import * as React from 'react'
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { screen, sleep } from '../../common/utils'

const PaginationStatus = {
  firstLoad: 0,
  waiting: 1,
  allLoaded: 2
}

type Props = {
  item: any,
  onFetch: Function,

  refreshableColors: string[],
  refreshableProgressBackgroundColor: string[],
  refreshableTintColor: string[],
  refresableSize: number,
  refreshableTitle: string,

  imageSource: string,
  emptyView: Function,
  paginationFetchingView: Function,
  paginationWaitingView: Function,
  paginationAllLoadedView: Function,

  allLoadedText: boolean,
  // Spinner
  waitingSpinnerText: string,

  numColumns: number
}

type State = {
  dataSource: any[],
  isRefreshing: boolean,
  paginationStatus: number
}

export default class PullList extends React.Component<Props, State> {
  static defaultProps = {
    onFetch: null,
    
    // Spinner
    waitingSpinnerText: 'Loading...',
  }

  state = {
    dataSource: [],
    isRefreshing: false,
    paginationStatus: PaginationStatus.firstLoad
  }

  mounted: boolean
  page: number
  rows: any[]
  scrollView: React.ElementRef<typeof ScrollView>
  _flatList: React.ElementRef<typeof FlatList>

  constructor(props: Props) {
    super(props)
    this.setPage(1)
    this.setRows([])
  }

  _keyExtractor = (item: any, index: number ) => String(index)

  componentWillMount() {
    this.mounted = false
  }

  componentDidMount() {
    this.mounted = true
    this.props.onFetch(this.getPage(), this.postRefresh, this.endFetch)
  }

  onRefresh = () => {
    console.log('onRefresh()')
    if (this.mounted) {
      this.setState({
        isRefreshing: true
      })
      this.setPage(1)
      this.props.onFetch(this.getPage(), this.postRefresh, this.endFetch)
    }
  }

  onPaginate = () => {
    console.log('onPaginate()')
    console.log('page', this.getPage())
    this.props.onFetch(this.getPage() + 1, this.postPaginate, this.endFetch)
  }

  onEndReached = () => {
    console.log('onEndReached()')
    if (this.state.paginationStatus === PaginationStatus.waiting) {
      this.onPaginate()
    }
  }

  setPage = (page: number) => this.page = page

  getPage = () => this.page

  setRows = (rows: any) => this.rows = rows

  getRows = () => this.rows

  scrollToOffset = (option: Object) => {
    this._flatList.scrollToOffset(option)  // Scroll to a specific content pixel offset in the list.(https://facebook.github.io/react-native/docs/flatlist.html#scrolltooffset)
  }

  scrollToIndex = (option: Object) => {
    this._flatList.scrollToIndex(option)  // Scrolls to the item at the specified index such that it is positioned in the viewable area such that viewPosition 0 places it at the top, 1 at the bottom, and 0.5 centered in the middle.(https://facebook.github.io/react-native/docs/flatlist.html#scrolltoindex)
  }

  scrollToItem = (option: Object) => {
    this._flatList.scrollToItem(option)  // Requires linear scan through data - use scrollToIndex instead if possible.(https://facebook.github.io/react-native/docs/flatlist.html#scrolltoitem)
  }

  scrollToEnd = (option: Object) => {
    this._flatList.scrollToEnd(option)  // Scrolls to the end of the content. May be janky without getItemLayout prop.(https://facebook.github.io/react-native/docs/flatlist.html#scrolltoend)
  }

  postRefresh = (rows: any[] = [], pageLimit: number) => {
    if (this.mounted) {
      console.log('postRefresh()')
      let paginationStatus = PaginationStatus.waiting
      if (rows.length < pageLimit) {
        paginationStatus = PaginationStatus.allLoaded
      }
      this.updateRows(rows, paginationStatus)
    }
  }

  endFetch = () => {
    console.log('endFetch()')
  }

  postPaginate = (rows: any[] = [], pageLimit: number) => {
    this.setPage(this.getPage() + 1)
    let mergedRows
    let paginationStatus
    if (rows.length === 0) {
      paginationStatus = PaginationStatus.allLoaded
    } else {
      mergedRows = this.getRows().concat(rows)
      paginationStatus = PaginationStatus.waiting
    }
    this.updateRows(mergedRows, paginationStatus)
  }

  updateRows = (rows: any[] = [], paginationStatus: number) => {
    console.log(rows)
    console.log(`updateRows(${paginationStatus})`)
    if (rows) {
      this.setRows(rows)
      this.setState({
        dataSource: rows,
        isRefreshing: false,
        paginationStatus
      })
    } else {
      this.setState({
        dataSource: this.getRows().slice(),
        isRefreshing: false,
        paginationStatus
      })
    }

    if (this.props.refreshableMode === 'advanced') {
      this.endFetch()
    }
  }

  paginationFetchingView = () => {
    console.log('paginationFetchingView()')
    
    if (this.props.paginationFetchingView) {
      return this.props.paginationFetchingView
    }

    return (
      <View style={styles.fetchingView}>
        <ActivityIndicator/>
        <Text style={styles.paginationViewText}>{this.props.waitingSpinnerText}</Text>
      </View>
    )
  }

  paginationAllLoadedView = () => {
    console.log('paginationAllLoadedView()')
    
    if (this.props.pagination) {
      if (this.props.paginationAllLoadedView) {
        return this.props.paginationAllLoadedView
      }
  
      return (
        <View style={styles.paginationView}>
          <Text style={styles.allLoadedText}>
            {this.props.allLoadedText}
          </Text>
        </View>
      )
    }

    return null
  }

  paginationWaitingView = (paginateCallback?: Function) => {
    console.log('paginationWaitingView()')
    if (this.props.paginationWaitingView) {
      return this.props.paginationWaitingView(paginateCallback)
    }
    
    return (
      <View style={styles.paginationView}>
        <ActivityIndicator />
        <Text style={styles.paginationViewText}>
          {this.props.waitingSpinnerText}
        </Text>
      </View>
    )
  }

  renderHeader = () => {
    return !!this.props.header ? this.props.header : null
  }

  renderItem = ({ item, index, separators }: Object) => {
    return !!this.props.item ? this.props.item(item, index, separators) : null
  }

  renderSeparator = () => {
  }

  renderEmpty = () => {
    if (this.state.paginationStatus !== PaginationStatus.firstLoad && this.props.emptyView) {
      return this.props.emptyView()
    }

    return (
      <View>
        <Text>暂无数据</Text>
      </View>
    )
  }

  renderFooter = () => {
    console.log('renderFooter()')
    if (this.state.paginationStatus === PaginationStatus.firstLoad) {
      return this.paginationFetchingView()
    } else if (this.state.paginationStatus === PaginationStatus.waiting) {
      return this.paginationWaitingView()
    } else if (this.state.paginationStatus === PaginationStatus.allLoaded && this.getRows().length !== 0) {
      return this.paginationAllLoadedView()
    }

    return null
  }

  renderScrollComponent = (props: any) => {
    // return (
    //   <RefreshableScrollView
    //     {...props}
    //     insideOfUltimateListView
    //     onRefresh={this.onRefresh}
    //     ref={ref => this.scrollView = ref}
    //   />
    // )

    return (
      <ScrollView
        {...props}
        ref={ref => this.scrollView = ref}
      />
    )
  }

  renderRefreshControl = () => {
    return (
      <RefreshControl
        onRefresh={this.onRefresh}
        refreshing={this.state.isRefreshing}
        colors={this.props.refreshableColors}
        progressBackgroundColor={this.props.refreshableProgressBackgroundColor}
        size={this.props.refresableSize}
        tintColor={this.props.refreshableTintColor}
        title={this.props.refreshableTitle}
      />
    )
  }

  render() {
    return (
      <FlatList
        ref={(ref: any) => this._flatList = ref}
        keyExtractor={this._keyExtractor}
        renderScrollComponent={this.renderScrollComponent}
        onEndReachedThreshold={0.1}
        data={this.state.dataSource}
        renderItem={this.renderItem}
        // ItemSeparatorComponent={this.renderSeparator}
        // ListHeaderComponent={this.renderHeader}
        ListFooterComponent={this.renderFooter}
        ListEmptyComponent={this.renderEmpty}
        onEndReached={this.onEndReached}
        refreshControl={this.renderRefreshControl}
        numColumns={this.props.numColumns}
      />
    )
  }
}

const styles = StyleSheet.create({
  fetchingView: {
    // width,
    // height,
    justifyContent: 'center',
    alignItems: 'center'
  },
  paginationView: {
    flex: 0,
    // width,
    height: 55,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paginationViewText: {
    fontSize: 16
  },
  paginationViewSpinner: {
    marginRight: 5
  },
  paginationBtn: {
    backgroundColor: 'tomato',
    margin: 10,
    borderRadius: 20,
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  paginationBtnText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  },
  separator: {
    height: 0.5,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: 'lightgray'
  },
  emptyView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  allLoadedText: {
    alignSelf: 'center',
    color: '#bfbfbf'
  },
  gridItem: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gridView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  }
})
