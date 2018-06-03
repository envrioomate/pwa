<template>
    <v-jumbotron color="grey lighten-2">
        <v-container fill-height>
            <v-layout align-center>
                <v-flex>
                    <h3 class="display-3">Your Group</h3>
                    <span class="subheading">Here you can see information about your team</span>
					
					<v-list two-line>
					  <template v-for="(item, index) in items">
						<v-subheader v-if="item.header" :key="item.header">{{ item.header }}</v-subheader>
						<v-divider v-else-if="item.divider" :inset="item.inset" :key="index"></v-divider>
						<v-list-tile v-else :key="item.title" avatar @click="">
						  <v-list-tile-avatar :color="item.color">
							<span class="white--text headline">{{ item.avatar }}</span>
						  </v-list-tile-avatar>
						  <v-list-tile-content>
							<v-list-tile-title v-html="item.title"></v-list-tile-title>
							<v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
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
          { avatar: 'A', title: 'Ali Connors', subtitle: "Subdata", color: "teal"},
          { divider: true, inset: true },
          { avatar: 'C', title: 'Christian Hölzer', subtitle: "Subdata", color: "blue"},
          { divider: true, inset: true },
          { avatar: 'J', title: 'Jennifer Müller', subtitle: "Subdata", color: "red"}
        ]
      }
    }
  }
</script>

<style scoped>

</style>