<template>
  <div class="container mx-auto">
    <div class="max-w-full border border-gray-300 rounded-sm bg-white">
      <div class="p-6">
        <h5 class="text-lg font-medium">Subject</h5>
        <form
          @submit.prevent="submitSubject"
          @keydown="subject.onKeydown($event)"
        >
          <AlertError :form="subject" />

          <div class="mt-4">
            <div>
              <label class="block" for="subject">Subject</label>
              <input
                type="text"
                id="subject"
                placeholder="Subject"
                v-model="subject.name"
                class="
                  w-full
                  px-4
                  py-2
                  mt-2
                  border
                  rounded-md
                  focus:outline-none focus:ring-1 focus:ring-blue-600
                "
              />
              <HasError :form="subject" field="name" />
            </div>

            <div class="flex items-baseline justify-between mt-5">
              <Button :form="subject" class="btn-primary"> Add Subject </Button>
            </div>
          </div>
        </form>

        <h5 class="text-lg font-medium mt-10 mb-4">Subject Name</h5>
        <div class="flex">
          <ul
            class="
              bg-gray-50
              w-full
              rounded-lg
              border border-gray-200
              text-gray-900
            "
          >
            <li
              class="px-6 py-2 border-b border-gray-200 w-full rounded-t-lg"
              v-for="item in subjectList"
              :key="item.id"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { useStore } from "vuex";
import { reactive } from "@vue/reactivity";
import Form from "vform";
import { computed, onMounted } from "@vue/runtime-core";
import { Button, HasError, AlertError } from "vform/src/components/tailwind";

const store = useStore();

const subject = reactive(
  new Form({
    name: null,
  })
);

const subjectList = computed(() => store.getters["subject/subjects"]);

async function submitSubject(ev) {
  try {
    // Submit the form.
    store.dispatch("subject/saveSubject", {
      subject: subject,
    });
    // Redirect home.
  } catch (error) {
    console.log(error);
  }
}
onMounted(() => {
  store.dispatch("subject/getSubjects");
});
</script>

<style scoped></style>
