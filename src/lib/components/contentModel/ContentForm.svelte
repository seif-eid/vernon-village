<script lang="ts">
	import type { ContentModel } from "$lib/server/interfaces";
    
    export let contentModel: ContentModel
</script>

<form method="POST" enctype="multipart/form-data">
    {#each contentModel.fields as field}
        <div>
            <label for={field.name} class="form-label">{field.displayName}</label>
            <input type={field.type.name} name={field.name} class="form-control" />
        </div>
    {/each}
    <br />
    <button type="submit" class="btn btn-primary">Submit</button>
</form>