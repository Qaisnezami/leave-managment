<template>

<div v-if="user.user_type == 'employee'">



   <div >
  <div v-for="(v, k) in errors" :key="k" class="bg-red-500 text-red rounded font-bold mb-4 shadow-lg py-2 px-4 pr-0">
    <p v-for="error in v" :key="error" class="text-sm">
      {{ error }}
    </p>
   
  </div >
    </div >
        
            <form class="space-y-6" @submit.prevent="saveLeave" >
                <div class="space-y-4 rounded-md shadow-sm">
                    <div>
                        <label for="from" class="block text-sm font-medium text-gray-700">From</label>
                        <div class="mt-1">
                            <input type="date" name="from" id="from"
                                class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                v-model="form.from">
                        </div>
                    </div>
                    <div>
                        <label for="to" class="block text-sm font-medium text-gray-700">To</label>
                        <div class="mt-1">
                            <input type="date" name="to" id="to"
                                class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                v-model="form.to">
                        </div>
                    </div>
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">Reason For Leave</label>
                        <div class="mt-1">
                            <textarea type="text" name="reason" id="reason"
                                class="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                v-model="form.reason"></textarea>
                        </div>
                    </div>

                    

                    
                </div>
                <br>
                <button type="submit"
                        class="inline-flex items-center px-4 py-2 text-xs font-semibold tracking-widest text-white uppercase bg-gray-800 rounded-md border border-transparent ring-gray-300 transition duration-150 ease-in-out hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring disabled:opacity-25">
                    Create
                </button>
            </form>
            </div>
  

</template>

<script>
import { reactive } from "vue";
import useLeaves from "../../composables/leave"

export default {
    setup() {
        const form = reactive({
            'reason': '',
            'from': '',
            'to': '',
        })

        const { errors, storeLeave } = useLeaves()

        const saveLeave = async () => {
            await storeLeave({...form});
        }

        user = window.user;
        return {
            form,
            errors,
            saveLeave,
            user
        }
    }
}
</script>