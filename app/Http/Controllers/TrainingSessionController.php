<?php

namespace App\Http\Controllers;

use App\Models\TrainingSession;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrainingSessionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('TrainingSessions/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('TrainingSessions/Add');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:2000',
            'mode' => 'required|string|in:virtual,physical',
            'venue' => 'required|string',
            'date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i|after_or_equal:09:00|before:end_time',
            'end_time' => 'required|date_format:H:i|after:start_time|before_or_equal:18:00',
            'duration' => 'required|integer',
        ]);

        TrainingSession::create($request->all());

        return redirect()->route('training-sessions.index')->with('message', 'Training session created successfully.');
    }
}
