<template>
	<view class="content">
		<view id="mycanvas"></view>
	</view>
</template>

<script>
	import lufy from '@/src/lufylegend-2.0.0.beta4.simple.js'

	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
				// test.test123()
			  var w = document.body.clientWidth;
			  var h = document.body.clientHeight;
			  var g = 0.08;
			  var vx = 0;
			  var layer;
			
			  lufy.LInit(requestAnimationFrame, 'mycanvas', w, h, main);
			  
			  function main(){
				  layer = new lufy.LSprite();
				  lufy.addChild(layer);
				  layer.graphics.drawRect(2, "#ff0000", [10, 10, 50, 100], true, "#880088")
				  layer.addEventListener(lufy.LEvent.ENTER_FRAME,onEnterFrame);
			  }
			  
			  function onEnterFrame(event){
				  vx += g;
				  layer.x += vx;

				  
			  }
			
		},
		methods: {

		}
	}
</script>

<style>

</style>
