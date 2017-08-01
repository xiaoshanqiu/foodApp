<template>
	<div class="shopcar">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper">
					<div class="logo">
						<i class="iconfont icon-shopping_cart"></i>
					</div>
				</div>
				<div class="money">
					￥0
				</div>
				<div class="cost">
					另需配送费4元
				</div>
			</div>


			<div class="content-right enough">
				还差20元
			</div>
		</div>
	</div>
</template>

<script>
	export default{

	}
</script>

<style lang="scss" scoped>

  @import '../../common/mixin.scss';

	.shopcar{
		font-size: 20px;
		color: #fff;
		.content{
			display: flex;
			.content-left{
				flex:1;
				.logo-wrapper{
					position: relative;
					float: left;
					height: 56px;
					width: 56px;
					padding: 6;
					margin: -12px 12px 4px 12px;
					border-radius: 50%;
					// background-color: pink;
					background-color: #141d27;
					.logo{
						height: 44px;
						width: 44px;
						position: absolute;
						left: 6px;
						top: 6px;
						border-radius: 50%;
						line-height: 44px;
						text-align: center;
						background-color: rgba(255,255,255,.2);
						i{
							color: rgba(255,255,255,.4);
						}
					}
				}
				.money{
					float: left;
					margin: 12px 12px 12px 0;
					line-height: 24px;
					font-weight: 700;
					font-size: 16px;
					color: rgba(255,255,255,.4);
				}
				.cost{
					float: left;
					margin-top: 12px;
					border-left: 1px solid rgba(255,255,255,.1);
					padding-left: 12px;
					line-height: 24px;
					font-weight: 700;
					font-size: 10px;
					color: rgba(255,255,255,.4);
				}
			}
			.content-right{
				flex:0 0 105px;
				width: 105px;
				line-height: 48px;
				font-size: 12px;
				font-weight: 700;
				text-align: center;
				color:rgba(255,255,255,.4);
				background-color: #2b333b;
				&.enough{
					color: #fff;
					background-color: #00b43c;
				}
			}
		}
	}
</style>