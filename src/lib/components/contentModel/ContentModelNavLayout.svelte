<script lang=ts>
	import type { ContentModel } from "$lib/server/interfaces";

 
    export let title: string
    export let slugRoot: string
    export let activeContentModel: ContentModel
    export let contentModels: ContentModel[]

    function isActive(contentModel: ContentModel): boolean {
        return activeContentModel._id == contentModel._id
    }
</script>

<div class="container">
    <h2>{title}</h2>
    <ul class="nav nav-tabs">
    {#each contentModels as contentModel}
        <li class="nav-item">
            <a 
                class={isActive(contentModel) ? "nav-link active" : "nav-link"}
                href="{slugRoot}/{contentModel.htmlName}"
                rel="external">
                {contentModel.name}
            </a>
        </li>
    {/each}
    </ul>
    <slot></slot>
</div>