<script>
	export let eventName = '';
	export let date = '';
	export let description = '';
	export let time = '';
	export let image = '';
	export let imagedesc = '';

	/**
	 * @param {string} time24H
	 */
	function convertTime(time24H) {
		return " at " + new Date('1970-01-01T' + time24H + 'Z')
			.toLocaleTimeString('en-US', {timeZone:'UTC',hour12:true,hour:'numeric',minute:'numeric'});
	}
	time = time !== "" ? convertTime(time) : "";
</script>

<div class="col mx-auto">
	<article class="post text-center">
		<h2 class="post-title">{eventName}</h2>
		<h3 class="post-subtitle">{date !== "" ? date + time : "" + time}</h3>
		{#if image != ""}
			<img src={image !== "" ? image : ""} class="img-fluid" style="display:{image !== "" ? "block" : "none"}" alt={imagedesc}>
		{/if}
		<p class="lead fw-normal text-muted mb-5">{description}</p>
	</article>
	<hr />
</div>

<!--Commented out for now and may revisit when further designing display page functionality.
	
	<button class="btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Read More</button>


	<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
	<div class="modal-dialog">
	  <div class="modal-content">
		<div class="modal-header">
		  <h5 class="modal-title" id="exampleModalLabel">Stargazing Event</h5>
		  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		</div>
		<div class="modal-body">
		</div>
		<div class="modal-footer">
		  <h6 class="modal-subtitle">February 18, 2023 9:00pm</h6>
		  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
		</div>
	  </div>
	</div>
  </div>-->