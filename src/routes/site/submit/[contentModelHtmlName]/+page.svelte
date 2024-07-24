<script lang="ts">
	import { afterUpdate } from "svelte";
	import ContentFormCard from "$lib/components/contentModel/ContentFormCard.svelte";
	import type { ContentModel } from "$lib/server/interfaces";
	import type { ActionData } from "./$types";
  
	// Access data from parent layout
	export let data: { activeContentModel: ContentModel };
	export let form: ActionData;
  </script>
  
  <style>
	.success-notification {
	  margin-top: 20px;
	  background-color: #4CAF50;
	  color: white;
	  padding: 15px;
	  border-radius: 5px;
	  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	}
  
	.failure-notification {
	  margin-top: 20px;
	  background-color: #F44336;
	  color: white;
	  padding: 15px;
	  border-radius: 5px;
	  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
	}
  </style>
  
  <ContentFormCard contentModel={data.activeContentModel} />
  
  {#if form?.success}
	<div class="success-notification">Bulletin Post Successfully Submitted</div>
  {:else if form?.badEmail}
	<div class="failure-notification">Please Enter a Valid Email Address</div>
  {/if}
  