<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use App\Http\Requests\StoreSubjectRequest;
use App\Http\Requests\UpdateSubjectRequest;
use App\Models\SubjectUser;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class SubjectController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $user = Auth::user();
    $subjects = Subject::whereHas('SubjectUser', function ($q) use ($user) {
      $q->where('user_id', $user->id);
    })->get();
    return response()->json($subjects ?? []);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \App\Http\Requests\StoreSubjectRequest  $request
   * @return \Illuminate\Http\Response
   */
  public function store(StoreSubjectRequest $request)
  {
    try {

      $data = $request->all();
      $user = Auth::user();
      $subject = Subject::create($data);

      $subjectUser = new SubjectUser();
      $subjectUser->user_id = $user->id;
      $subjectUser->subject_id = $subject->id;
      $subjectUser->save();

      return response()->json($subject, 200);
    } catch (\Exception $e) {
      return throw ValidationException::withMessages([
        'error' => $e->getMessage()
      ]);
    }
  }
}
