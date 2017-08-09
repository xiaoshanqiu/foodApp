<template>
	<div class="control">

		<transition name="move">
			<div class="remove" v-show="food.count" @click.stop.prevent="remove($event)">
				<i class="iconfont icon-remove_circle_outline"></i>
			</div>
		</transition>

		<transition name="fade">
			<div class="count" v-show="food.count">{{food.count}}</div>
		</transition>

		<div class="add" @click.stop.prevent="add($event)">
			<i class="iconfont icon-add_circle"></i>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	export default{
		props:{
			food:{
				return:Object
			}
		},
		methods:{
			add(event){
				if(!event._constructed){
					return
				}
				if(!this.food.count){
					Vue.set(this.food,'count',1)
				}else{
					this.food.count++
				}
			},
			remove(event){
				if(!event._constructed){
					return
				}else{
					this.food.count--
				}
			},
				
		}
	}
</script>

<style lang="scss" scoped>
	.control{
		.iconfont{
			font-size: 24px;
			color:#00a0dc;
		}
		.remove{
			display: inline-block;
			vertical-align: top;
			line-height: 24px;
		}
		.count{
			display: inline-block;
			vertical-align: top;
			line-height: 24px;
			color: rgb(147,153,159);

		}
		.add{
			display: inline-block;
			vertical-align: top;
			line-height: 24px;

		}
	}
</style>