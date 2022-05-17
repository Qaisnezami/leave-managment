import { ref } from 'vue'
import axios from "axios";
import { useRouter } from 'vue-router';

export default function useLeaves() {
    const LeaveList = ref([])
    const Leave = ref([])
    const router = useRouter()
    const errors = ref('')

    const getLeaveList = async () => {
        let response = await axios.get('/api/leave')
        LeaveList.value = response.data.data;
    }

    const approvelLeave = async(id,approvel)=>{
        await axios.post('/api/leave/aprovel/' + id,{
            'approvel':approvel,
        })
    }

    const getLeave = async (id) => {
        let response = await axios.get('/api/Leaves/' + id)
        Leave.value = response.data.data;
    }

    const storeLeave = async (data) => {
        errors.value = ''
        try {
            await axios.post('/api/leave', data)
            await router.push({name: 'leave.index'})
        } catch (e) {
            
            if (e.response.status === 422) {
                errors.value = e.response.data.errors
            }
        }
    }

    const updateLeave = async (id) => {
        errors.value = ''
        try {
            await axios.put('/api/Leaves/' + id, Leave.value)
            await router.push({name: 'Leaves.index'})
        } catch (e) {
            if (e.response.status === 422) {
               errors.value = e.response.data.errors
            }
        }
    }

    const destroyLeave = async (id) => {
        await axios.delete('/api/Leaves/' + id)
    }


    return {
        LeaveList,
        Leave,
        errors,
        getLeaveList,
        getLeave,
        storeLeave,
        updateLeave,
        destroyLeave,
        approvelLeave
    }
}