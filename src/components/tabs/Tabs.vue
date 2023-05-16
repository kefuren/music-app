<template>
  <div :class="classes" class="flex justify-between">
		<template class="flex">
			<slot></slot>
		</template>
		<slot name="searchinput"></slot>
	</div>
</template>

<script setup>
import { ref, computed, watch, provide } from "vue";
import { tabsKey } from '@/utils/symbols'

const emit = defineEmits(['onUpdate:modelValue']);

const props = defineProps({
	modelValue: [ Number, String ],
	activeClass: String,
	activeColor: String,
	bordered: Boolean,
	'onUpdate:modelValue': [ Function, Array ]
})

const currentModel = ref(props.modelValue);

const classes = computed(() => 'tab-list' + (props.bordered ? " border" : ""))

const tabProps = computed(() => ({
	activeClass: props.activeClass,
	activeColor: props.activeColor,
	bordered: props.bordered
}));

watch(
	() => props.modelValue, 
	name => { updateModel({ name, setCurrent: true, skipEmit: true })}
);

function updateModel ({ name, setCurrent, skipEmit }) {
	if (currentModel.value !== name) {
		if (skipEmit !== true && props[ 'onUpdate:modelValue' ] !== void 0) {
			emit('update:modelValue', name);
		}

		if (
			setCurrent === true
			|| props[ 'onUpdate:modelValue' ] === void 0
		) {
			currentModel.value = name;
		}
	}
}

const $tabs = {
	tabProps,
	currentModel,
	updateModel,
}

provide(tabsKey, $tabs);

</script>

<style lang="scss" scoped>
.tab-list {
	display: flex;
	user-select: none;
}
.border {
	border-bottom: solid 1px rgba(0,0,0,.05);
}
</style>