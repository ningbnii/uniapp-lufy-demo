<template>
	<view>
		<canvas id="draw"></canvas>
	</view>
</template>

<script>
	// import lufy from '@/lib/lufylegend-2.0.0.beta4.simple.js'
	export default {
		data() {
			return {
				
			}
		},
		onReady() {
			var w = document.body.clientWidth;
			var h = document.body.clientHeight;
			var backgroundLayer;
			var loader;
		
			LInit(50,'draw',w,h,main);
			
			function main(){
				initBackgroundLayer()
				let graphics = new LGraphics();
				backgroundLayer.addChild(graphics);
				
				// 矩形
				graphics.drawRect(1,'#000000',[50,50,100,100]);
				
				// 图片的加载与显示
				loader = new LLoader();
				loader.addEventListener(LEvent.COMPLETE,loadBitmapdata);
				loader.load('/static/logo.png','bitmapData');
			}
			
			function loadBitmapdata(event){
				var bitmapdata = new LBitmapData(loader.content);
				var bitmap = new LBitmap(bitmapdata);
				addChild(bitmap)
			}
			
			function initBackgroundLayer(){
				backgroundLayer = new LSprite();
				addChild(backgroundLayer)
			}
		},
		methods: {

			
			
		}
	}
</script>

<style>

</style>
