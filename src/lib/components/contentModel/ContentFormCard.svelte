<script lang="ts">
	import type { ContentModel } from "$lib/server/interfaces";
    import ContentModelForm from "./ContentForm.svelte";
	
    export let contentModel: ContentModel
</script>

<div class="card">
	<div class="card-body">
        <h3 class="card-title">{contentModel.name}</h3>
		<ContentModelForm contentModel={contentModel} />
	</div>
</div>