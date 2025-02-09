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
        $modes = ['virtual', 'physical'];
        $trainingSessions = TrainingSession::get()->groupBy('mode')->sortBy('date');
        $trainingSessions = collect($modes)->mapWithKeys(function ($mode) use ($trainingSessions) {
            return [$mode => $trainingSessions->get($mode, collect([]))];
        });
        // dd($trainingSessions);
        // dd(compact('trainingSessions'));
        return Inertia::render('TrainingSessions/Index', compact('trainingSessions'));
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
            'venue' => 'required|string|max:255',
            'date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i|after_or_equal:09:00|before:end_time',
            'end_time' => 'required|date_format:H:i|after:start_time|before_or_equal:18:00',
            'duration' => 'required|date_format:H:i',
        ]);

        TrainingSession::create($request->all());

        return redirect()->route('training-sessions.index')->with('message', 'Training Session created successfully.');
    }

    public function edit(TrainingSession $trainingSession)
    /**
     * Show the form for editing the specified resource.
     */
    {
        // dd(compact('training'));
        return Inertia::render('TrainingSessions/Edit', compact('trainingSession'));
    }
    public function update(Request $request, TrainingSession $trainingSession)
    /**
     * Update the specified resource in storage.
     */
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:2000',
            'mode' => 'required|string|in:virtual,physical',
            'venue' => 'required|string',
            'date' => 'required|date|after_or_equal:today',
            'start_time' => 'required|date_format:H:i|after_or_equal:09:00|before:end_time',
            'end_time' => 'required|date_format:H:i|after:start_time|before_or_equal:18:00',
            'duration' => 'required|date_format:H:i',

        ]);

        $trainingSession->update($request->all());

        return redirect()->route('training-sessions.index')->with('message', 'Training session updated successfully.');
    }
    public function destroy(TrainingSession $trainingSession)
    /**
     * Remove the specified resource from storage.
     */
    {
        $trainingSession->delete();
        return back()->with('message', 'Training session deleted successfully.');
    }

}
