<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LeaveRequest;
use App\Http\Resources\LeaveResource;
use App\Models\Leave;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LeaveController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // We can user Middlewares as well but to this small project i used if
        if(auth('api')->user()->user_type == 'manager'){

            return  LeaveResource::collection(Leave::all());
        }else
        {
            return  LeaveResource::collection(Leave::where('user_id',auth('api')->user()->id)->get());
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(LeaveRequest $request)
    {
        
        
       $leave =  Leave::create([
           'reason'=>$request->reason,
           'from'=>$request->from,
           'to'=>$request->to,
           'user_id'=>auth('api')->user()->id,
           'approvel'=>0,
       ]);
       
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Leave  $leave
     * @return \Illuminate\Http\Response
     */
    public function show(Leave $leave)
    {
        return new LeaveResource($leave);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Leave  $leave
     * @return \Illuminate\Http\Response
     */
    public function update(LeaveRequest $request, Leave $leave)
    {
        $leave->update($request->validate());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Leave  $leave
     * @return \Illuminate\Http\Response
     */
    public function destroy(Leave $leave)
    {
        $leave->delete();
    }

    public function approvel(Request $request,Leave $leave){
        
      return $leave->update(['approvel'=>$request->approvel]);
    }
}
