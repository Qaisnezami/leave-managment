<template>
    <div class="overflow-hidden overflow-x-auto w-full align-middle sm:rounded-md">
        <div class="flex place-content-end mb-4">
            <div class="px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer">
                <router-link :to="{ name: 'leave.create' }" v-if="user.user_type == 'employee'" class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 ">Get Leave</router-link>
            </div>
        </div>
        
        <table class="w-full w-100 border divide-y divide-gray-200">
            <thead>
            <tr>
                <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Name</span>
                </th>
                <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Reason</span>
                </th>
                <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">From Date</span>
                </th>
                <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">To Date</span>
                </th>
                <th class="px-6 py-3 bg-gray-50">
                    <span
                        class="text-xs font-medium tracking-wider leading-4 text-left text-gray-500 uppercase">Approvel</span>
                </th>
                
                <th class="px-6 py-3 bg-gray-50">
                </th>
            </tr>
            </thead>

            <tbody class="bg-white divide-y divide-gray-200 divide-solid ">
            <template v-for="item in LeaveList" :key="item.id">
                <tr class="bg-white">
                    <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                        {{ item.user }}
                    </td>
                    <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                        {{ item.reason }}
                    </td>
                    <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                        {{ item.from }}
                    </td>
                    <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap">
                        {{ item.to }}
                    </td>
                   
                    <div v-if="user.user_type == 'manager'">
                            <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap" v-if="item.approvel == 0">
                        
                        <button @click="Approvel(item.id ,1)"
                                class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">
                        Yes</button> 
                        |
                        <button @click="Approvel(item.id, 2)"
                                class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">
                        No</button> 
                    </td>
                    <td class="px-6 py-4 text-sm leading-5 text-white-900 whitespace-no-wrap " v-else-if="item.approvel == 1">
                       
                        Approved
                    </td>
                    <td class="px-6 py-4 text-sm leading-5 text-white-900 whitespace-no-wrap " v-else-if="item.approvel == 2">
                        
                        Not Approved
                    </td>
                    </div>
                    <div v-if="user.user_type == 'employee'">
                            <td class="px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap" v-if="item.approvel == 0">
                       
                        <p>Paddding</p>
                    </td>
                    <td class="px-6 py-4 text-sm leading-5 text-white-900 whitespace-no-wrap " v-else-if="item.approvel == 1">
                        
                        Approved
                    </td>
                    <td class="px-6 py-4 text-sm leading-5 text-white-900 whitespace-no-wrap " v-else-if="item.approvel == 2">
                        
                        Not Approved
                    </td>
                    </div>
                    
                </tr>
            </template>
            </tbody>
        </table>
    </div>
</template>

<script>
import useLeaves from "../../composables/leave"
import {onMounted} from "vue";
export default {
    setup(){
        const {LeaveList,getLeaveList,approvelLeave} = useLeaves();
        onMounted(getLeaveList);

       const Approvel= async (id,approvel) =>{
           if (!window.confirm('Are you sure?')) {
                return
            }
           await approvelLeave(id,approvel);
           await getLeaveList();
        }
         user = window.user;
        return {
            LeaveList,
            Approvel,
            user
        }

    }
    
   
}
</script>

<style>

</style>