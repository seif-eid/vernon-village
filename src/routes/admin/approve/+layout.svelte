<script lang="ts">
	import ContentModelNavLayout from "$lib/components/contentModel/ContentModelNavLayout.svelte";
    import type { ContentModel } from "$lib/server/interfaces";

    export let data: { 
        activeContentModel: ContentModel, 
        contentModels: ContentModel[]
    }
</script>
<svelte:head>
  <title>Approve Content!</title>
</svelte:head>

<ContentModelNavLayout 
    title="Approve Community Content!"
    slugRoot="/admin/approve"
    activeContentModel={data.activeContentModel}
    contentModels={data.contentModels}>
    <slot></slot>
</ContentModelNavLayout>