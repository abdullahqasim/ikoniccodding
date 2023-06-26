<?php

namespace App\View\Components;

use Illuminate\View\Component;

class network_connections extends Component
{
    public $suggestion;
    public $requestSent;
    public $requestReceived;
    public $connection;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($suggestion, $requestSent, $requestReceived, $connection)
    {
        $this->suggestion = $suggestion;
        $this->requestSent = $requestSent;
        $this->requestReceived = $requestReceived;
        $this->connection = $connection;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view('components.network_connections');
    }
}
