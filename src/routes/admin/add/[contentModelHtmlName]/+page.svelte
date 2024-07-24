<script lang="ts">
	import ContentFormCard from '$lib/components/contentModel/ContentFormCard.svelte';
	import type { ContentModel } from '$lib/server/interfaces';

	// access data from parent layout
	export let data: { activeContentModel: ContentModel };
</script>

<ContentFormCard contentModel={data.activeContentModel} />