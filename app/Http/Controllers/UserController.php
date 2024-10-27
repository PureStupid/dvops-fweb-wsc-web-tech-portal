<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Users/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Users/Add');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'gender' => 'required|in:female,male',
            'role' => 'required|in:student,lecturer',
            'phone_number' => ['required', 'regex:/^[8-9]\d{7}$/'],
            'avatar' => 'file|mimes:png,jpg,jpeg'
        ]);

        $name = Str::title($request->name);
        $emailDomain = Str::after($request->email, '@');
        if (($request->role === 'lecturer' && $emailDomain !== 'tp.edu.sg') || ($request->role === 'student' && $emailDomain !== 'student.tp.edu.sg')) {
            return redirect()->route('dashboard')->withErrors(['emaii' => 'Invalid email domain.'])->withInput();
        }
        if ($request->role === 'student') {
            $adminNumber = Str::before($request->email, '@');
            if (!preg_match('/^2\d{6}[a-zA-Z]$/', $adminNumber)) {
                return redirect()->route('dashboard')->withErrors(['emaii' => 'Student email format is invalid'])->withInput();
            }
        }



    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}