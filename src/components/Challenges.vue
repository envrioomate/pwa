<template>
    <v-jumbotron color="grey lighten-2">
        <v-container fill-height>
            <v-layout align-center>
                <v-flex>
                    <h3 class="display-3">Challenges</h3>
					
					<v-list three-line>
					  <template v-for="(item, index) in items">
						<v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
						<v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
						<v-list-tile v-else :key="item.title" avatar @click="">
						  <v-list-tile-avatar color="orange">
							<span class="white--text headline">{{ item.avatar }}</span>
						  </v-list-tile-avatar>
						  <v-list-tile-content>
							<v-list-tile-title v-html="item.title"></v-list-tile-title>
							<v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
							<v-progress-linear :value="item.progress" height="20" color="success"></v-progress-linear>
						  </v-list-tile-content>
						</v-list-tile>
					  </template>
					</v-list>
					
                </v-flex>
            </v-layout>
        </v-container>
    </v-jumbotron>
</template>

<script>
	export default {
    data () {
      return {
        items: [
          { avatar: 'A', title: 'Fuel saver', subtitle: "Description of task", progress: 100},
          { divider: true, inset: true },
          { avatar: 'B', title: 'Less Water use', subtitle: "Description of task", progress: 32},
          { divider: true, inset: true },
          { avatar: 'C', title: 'More ideas', subtitle: "Description of task", progress: 0}
        ]
      }
    }
  }
</script>

<style scoped>

</style>