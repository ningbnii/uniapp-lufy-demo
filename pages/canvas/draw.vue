<template>
	<view>
		<canvas id="draw"></canvas>
	</view>
</template>

<script>
	import lufy from '@/lib/lufylegend-2.0.0.beta4.simple.js'
	export default {
		data() {
			return {
				
			}
		},
		onReady() {
			var w = document.body.clientWidth;
			var h = document.body.clientHeight;
			var backgroundLayer;
			
			lufy.LInit(20,'draw',w,h,main);
			
			function main(){
				initBackgroundLayer()
				let graphics = new lufy.LGraphics();
				backgroundLayer.addChild(graphics);
				
				// 矩形
				graphics.drawRect(1,'#000000',[50,50,100,100]);
			}
			
			function initBackgroundLayer(){
				backgroundLayer = new lufy.LSprite();
				lufy.addChild(backgroundLayer)
			}
		},
		methods: {

			
			
		}
	}
</script>

<style>

</style>
