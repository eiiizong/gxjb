<template>
	<view class="yh-button-wrapper" :class="buttonWrapperClass">
		<button class="yh-button" :style="buttonStyle" :class="buttonClass" :open-type="openType" :loading="nLoading" :disabled="disabled" @click="$emit('clcik', $event)">
			<text class="icon icon-loading" v-if="loading"></text>
			<slot></slot>
			<slot name="prefix"></slot>
			<text class="yh-text" v-if="value">{{ value }}</text>
			<slot name="sufix"></slot>
		</button>
	</view>
</template>

<script>
/** Transition 过渡动画
 * @description 简单过渡动画组件 * @tutorial https://ext.dcloud.net.cn/plugin?id=985
 * @property {Boolean} disabled = [false|true] 设置按钮为禁用状态
 * @property {Boolean} block = [false|true] 设置按钮为块级元素 占用父级元素100%的宽度
 * @property {Boolean} loading = [false|true] 设置按钮为加载中状态
 * @property {Boolean} ghost =[false|true] 幽灵属性 使按钮背景透明
 * @property {String} value 按钮名称，默认值为 操作按钮
 * @property {String} shape = [circle] 按钮形状，可选值为circle或者不设置
 * 
 * @property {String} type = [default|primary|dashed|text|success|info|warning|error] 设置按钮类型 不同背景色

 * @property {String} openType = [contact|primary|dashed|text|success|info|warning|error] 微信开发能力
 *  @value contact 打开客服会话
 * @value default 白色背景 * @property {String} size = [default|large|small] 设置按钮大小
 * 	@value default 默认
 */
export default {
	name: 'yhButton',
	props: {
		value: {
			type: [String],
			default: 'Button'
		},
		type: {
			type: [String],
			default: ''
		},
		openType: {
			type: [String],
			default: ''
		},
		className: {
			type: [String],
			default: ''
		},
		size: {
			type: [String],
			default: ''
		},
		shape: {
			type: [String],
			default: ''
		},
		width: {
			type: [String, Number],
			default: ''
		},
		nLoading: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		block: {
			type: Boolean,
			default: false
		},
		long: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		},
		shadow: {
			type: Boolean,
			default: false
		},
		// 幽灵属性 使按钮背景透明
		ghost: {
			type: [Boolean],
			default: false
		}
	},
	data() {
		return {};
	},
	watch: {},
	computed: {
		buttonWrapperClass() {
			const block = this.block;
			const className = this.className;
			let str = '';
			if (block) {
				str += 'block ';
			}
			if (className) {
				str += className + ' ';
			}
			return str;
		},
		buttonClass() {
			const disabled = this.disabled;
			const ghost = this.ghost;
			const shape = this.shape;
			const size = this.size;
			const type = this.type;
			const shadow = this.shadow;
			const long = this.long;
			const isHasPrefix = this.$scopedSlots.prefix;
			const isHasSufix = this.$scopedSlots.sufix;
			let str = '';

			if (disabled) {
				str += 'disabled ';
			}
			if (ghost) {
				str += 'ghost ';
			}
			if (shadow) {
				str += 'shadow ';
			}
			if (long) {
				str += 'long ';
			}
			if (isHasPrefix) {
				str += 'prefix ';
			}
			if (isHasSufix) {
				str += 'sufix ';
			}
			if (shape) {
				str += shape + ' ';
			}
			if (size) {
				str += size + ' ';
			}
			if (type) {
				str += type + ' ';
			}
			return str;
		},
		buttonStyle() {
			const width = this.width;
			let str = '';

			if (width) {
				str += 'width: ' + width + 'rpx';
			}
			return str;
		}
	},
	created() {},
	methods: {}
};
</script>

<style scoped lang="scss">
$button-bgc: #fff;
$button-bgc-primary: #2d8cf0;
$button-bgc-info: #2db7f5;
$button-bgc-success: #19be6b;
$button-bgc-warning: #f90;
$button-bgc-error: #ed4014;

$button-color: #515a6e;
$button-color-reverse: #fff;

$button-border-color: #dcdee2;

$button-height: 64rpx;
$button-height-large: 80rpx;
$button-height-small: 42rpx;

$button-font-size: 28rpx;
$button-font-size-large: 32rpx;
$button-font-size-small: 24rpx;

@keyframes spin {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
view,
button {
	box-sizing: border-box;
}
.yh-button-wrapper {
	width: auto;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	&.block {
		width: 100%;
		display: flex;
	}
}
.icon-loading {
	font-size: $button-font-size + 8rpx;
	color: #fff;
	margin-right: 10rpx;
	animation: spin 1s infinite linear;
}
.yh-button {
	flex: 1;
	margin: 0;
	outline: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.3s;
	font-weight: 400;
	line-height: 1;
	border-radius: 8rpx;
	padding: 0 18rpx;
	font-size: $button-font-size;
	height: $button-height;
	color: $button-color;
	background-color: $button-bgc;
	border: 1px solid $button-border-color;
	.icon{
		color: #fff;
	}
	// 清除微信边框
	&::after {
		border: 0;
	}
	&.button-hover,
	&:active {
		// background-color: $button-bgc;
		opacity: .6;
		// transform: translate(-2rpx, -2rpx);
	}
	&[disabled],
	&.disabled {
		opacity: 0.6;
		color: $button-color;
	}
	&.shadow {
		box-shadow: 4rpx 14rpx 30rpx 0 $button-color;
	}
	&.ghost {
		background-color: transparent;
	}
	&.circle {
		border-radius: 400px;
	}
	&.long {
		width: 100%;
		border-radius: 0;
		margin: 0;
	}
	&.dashed {
		border-style: dashed;
		background-color: transparent;
		border-color: $button-border-color;
	}
	&.text {
		background-color: transparent !important;
		border: 0;
		padding: 0;
		height: auto;
		box-shadow: none;
	}
	&.primary {
		background-color: $button-bgc-primary;
		border-color: $button-bgc-primary;
		color: $button-color-reverse;
		&.shadow {
			box-shadow: 4rpx 14rpx 30rpx 0 $button-bgc-primary;
		}
		&.ghost {
			background-color: transparent;
			color: $button-bgc-primary;
		}
		&.dashed {
			border-style: dashed;
		}
	}
	&.info {
		background-color: $button-bgc-info;
		border-color: $button-bgc-info;
		color: $button-color-reverse;
		&.shadow {
			box-shadow: 4rpx 14rpx 30rpx 0 $button-bgc-info;
		}
		&.ghost {
			background-color: transparent;
			color: $button-bgc-info;
		}
		&.dashed {
			border-style: dashed;
		}
	}
	&.success {
		background-color: $button-bgc-success;
		border-color: $button-bgc-success;
		color: $button-color-reverse;
		&.shadow {
			box-shadow: 4rpx 14rpx 30rpx 0 $button-bgc-success;
		}
		&.ghost {
			background-color: transparent;
			color: $button-bgc-success;
		}
		&.dashed {
			border-style: dashed;
		}
	}
	&.warning {
		background-color: $button-bgc-warning;
		border-color: $button-bgc-warning;
		color: $button-color-reverse;
		&.shadow {
			box-shadow: 4rpx 14rpx 30rpx 0 $button-bgc-warning;
		}
		&.ghost {
			background-color: transparent;
			color: $button-bgc-warning;
		}
		&.dashed {
			border-style: dashed;
		}
	}
	&.error {
		background-color: $button-bgc-error;
		border-color: $button-bgc-error;
		color: $button-color-reverse;
		&.shadow {
			box-shadow: 4rpx 14rpx 30rpx 0 $button-bgc-error;
		}
		&.ghost {
			background-color: transparent;
			color: $button-bgc-error;
		}
		&.dashed {
			border-style: dashed;
		}
	}
	&.small {
		height: $button-height-small;
		font-size: $button-font-size-small;
		.icon-loading {
			font-size: $button-font-size-small + 8rpx;
		}
	}
	&.large {
		height: $button-height-large;
		font-size: $button-font-size-large;
		.icon-loading {
			font-size: $button-font-size-large + 8rpx;
		}
	}
	&.sufix {
		.yh-text {
			margin-right: 10rpx;
		}
	}
	&.prefix {
		.yh-text {
			margin-left: 10rpx;
		}
	}
}
</style>
