<template>
	<div class="tab" 
		:class="classes"
		:tabindex="tabIndex"
	>
		<span @click="onClick">
			{{ label }}
			<slot name="labelBefore"></slot>
		</span>
	</div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import { tabsKey } from '@/utils/symbols'

const emits = defineEmits(['click']);

const props = defineProps({
	label: [ Number, String ],
	name: {
    type: [ Number, String ],
    default: () => `t_${ new Date().getTime() }`
  },
	tabindex: [ String, Number ],
  disable: Boolean,
});

const $tabs = inject(tabsKey)

const isActive = computed(() => $tabs.currentModel.value === props.name);

const classes = computed(() => 
	isActive.value === true
	? (
			'tab--active'
			+ ($tabs.tabProps.value.activeClass ? ' ' + $tabs.tabProps.value.activeClass : '')
			+ ($tabs.tabProps.value.activeColor ? ` text-${ $tabs.tabProps.value.activeColor }` : '')
			+ ($tabs.tabProps.value.activeBgColor ? ` bg-${ $tabs.tabProps.value.activeBgColor }` : '')
			+ ($tabs.tabProps.value.bordered ? ` active--border` : '')
		)
	: 'tab--inactive'
)

const tabIndex = computed(() => (
	(
		props.disable === true || isActive.value === false
	)
		? -1
		: props.tabindex || 0
))

const onClick = (e) => {
	$tabs.updateModel({ name: props.name });
	emits('click', e);
}
</script>

<style lang="scss" scoped>
.tab {
	margin-right: 30px;
	font-size: 14px;
	color: #666;
	&:hover {
		color: #000;
		font-weight: bold;
	}
}
.tab--active {
	color: #000;
	font-weight: bold;
}
.active--border {
	margin-bottom: -1px;
	border-bottom: solid 2px #c3473a;
}
.text-red {
	color: #c3473a;
}
</style>