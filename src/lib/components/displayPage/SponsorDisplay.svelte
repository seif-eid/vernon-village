<script>
	export let sponsorName = '';
	export let description = '';
	export let image = '';
	export let imagedesc = '';
</script>

<div class="col mx-auto">
	<article class="post text-center">
		<h2 class="post-title">{sponsorName}</h2>
		{#if image != ""}
			<img src="{image}" style="display:{image !== "" ? "block" : "none"}" alt={imagedesc}>
		{/if}
		<p class="lead fw-normal text-muted mb-3">{description}</p>
	</article>
	<hr />
</div>