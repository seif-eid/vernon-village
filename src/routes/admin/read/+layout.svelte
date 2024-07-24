<script lang="ts">
	import ContentModelNavLayout from "$lib/components/contentModel/ContentModelNavLayout.svelte";
    import type { ContentModel } from "$lib/server/interfaces";

    export let data: { 
        activeContentModel: ContentModel, 
        contentModels: ContentModel[]
    }
</script>
<svelte:head>
  <title>Edit Community Content!</title>
</svelte:head>
<ContentModelNavLayout 
    title="Edit Community Content!"
    slugRoot="/admin/read"
    activeContentModel={data.activeContentModel}
    contentModels={data.contentModels}>
    <slot></slot>
</ContentModelNavLayout>