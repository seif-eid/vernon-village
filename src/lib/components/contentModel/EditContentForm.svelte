<script lang="ts">
	import type { ContentModel } from "$lib/server/interfaces";
    
    export let contentModel: ContentModel
    export let fields: any;

</script>

<form method="POST" enctype="multipart/form-data">
    {#each contentModel.fields as field}
    {#if field.name =="password"}
    <div>
        <label for={field.name} class="form-label">{field.displayName}</label>
        <input type="password" name={field.name} class="form-control" value='{fields[field.name]}'/>
    </div>
    {:else}
        <div>
            <label for={field.name} class="form-label">{field.displayName}</label>
            <input type={field.type.name} name={field.name} class="form-control" value='{fields[field.name]}'/>
        </div>
    {/if}
        {#if field.name == "image"}
            <div>
                <input type="checkbox" class="form-check-input" name="deleteImage" value="delete"/>
                <label for="deleteImage" class="form-check-label">Delete Image</label>
            </div>
        {/if}
    {/each}
    <br />
    <button type="submit" class="btn btn-primary">Submit</button>
</form>