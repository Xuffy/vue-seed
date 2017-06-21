<script>
  import Slider from '../../components/Slider'
  import Bar from '../../components/Bar'
  import BarItem from '../../components/BarItem'
  import VLayer from '../../components/PullToRefreshLayer'
  import VCardContainer from '../../components/Card'
  import Btn from '../../components/Button'
  import Card from '../../components/CardItem'
  import VContent from '../../components/Content'
  import List from '../../components/List'
  import Item from '../../components/ListItem'
  import $ from 'zepto'

  export default {
    template: require('./index.html'),
    route: {
      data () {
        return this.$http.get('tasks')
          .then(({data: {code, message, data}}) => {
            this.$set('tasks', data)
          })
      }

    },
    ready () {
      $.init()
    },
    data () {
      return {
        banner: [],
        tasks: []
      }
    },
    computed: {
      length () {
        return this.tasks.length
      }
    },
    methods: {
      refresh () {
        setTimeout(function () {
          let num = this.length + 1
          let title = `标题${num}`
          let adv = `abc${num}`
          let time = (new Date()).getTime() / 1000
          let point = 100 + num - 1
          this.tasks.push({
            id: num,
            title: title,
            advertiser: adv,
            status: '1',
            created: time,
            read_profit: point
          })
          $.pullToRefreshDone('.pull-to-refresh-content')
        }.bind(this), 1500)
      }
    },
    components: {
      Slider,
      Bar,
      BarItem,
      VLayer,
      VCardContainer,
      Card,
      VContent,
      List,
      Item,
      Btn
    }
  }

</script>

<style lang="sass">
    @import "./index.sass";
</style>
