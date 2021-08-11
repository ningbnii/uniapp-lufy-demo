<template>
	<view class="content">
		<view class="list">
<!-- 			<navigator url="/pages/canvas/draw">
				<button type="default">draw</button>
			</navigator> -->
			<button type="default" @click="goToDraw">draw</button>
		</view>
		<!-- <canvas id="mycanvas"></canvas> -->
	</view>
</template>

<script>
	// import lufy from '@/lib/lufylegend-2.0.0.beta4.simple.js'

	export default {
		data() {
			return {
	
			}
		},
		onLoad() {
			  var w = document.body.clientWidth;
			  var h = document.body.clientHeight;
			  var g = 0.08;
			  var vx = 0;
			  var layer;
			
			  LInit(requestAnimationFrame, 'mycanvas', w, h, main);
			  
			  function main(){
				  layer = new LSprite();
				  addChild(layer);
				  layer.graphics.drawRect(2, "#ff0000", [10, 10, 50, 100], true, "#880088")
				  layer.addEventListener(LEvent.ENTER_FRAME,onEnterFrame);
			  }
			  
			  function onEnterFrame(event){
				  vx += g;
				  layer.x += vx;

				  
			  }
			
		},
		onReady() {

		},
		methods: {
			goToDraw(){
				uni.navigateTo({
					url:'/pages/canvas/draw'
				})
			}
		}
	}
</script>

<style>
	.polyVideo {
		width: 100%;
		height: 420rpx;
	}
</style>
