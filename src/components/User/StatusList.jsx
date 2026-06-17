import React from "react";
import girl from "../images/girl.jpg";
import boy from "../images/boy.jpg";
import useConversation from "../Zustand/useConversation";


function StatusList() {

    const { setActiveView, setSelectedConversation } =
        useConversation();

    const openStatus = () => {
        setSelectedConversation(null);
        setActiveView("status");
    };

    const statuses = [
        {
            id: 1,
            name: "My Status",
            image: boy,
            time: "Today, 12:30 PM",
            own: true,
        },
        {
            id: 2,
            name: "Ayan",
            image: boy,
            time: "10 minutes ago",
        },
        {
            id: 3,
            name: "Saroj",
            image: girl,
            time: "25 minutes ago",
        },
    ];

    return (
        <div className="border-b border-[#222e35]">
            <div className="px-4 py-2 text-xs text-[#8696a0] font-semibold uppercase">
                Status
            </div>

            {statuses.map((status) => (
                <div
                    key={status.id}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#202c33] cursor-pointer"
                >
                    <div className="relative">
                        <img
                            src={status.image}
                            alt=""
                            className="w-12 h-12 rounded-full object-cover border-2 border-[#00a884]"
                        />

                        {status.own && (
                            <div className="absolute bottom-0 right-0 bg-[#00a884] text-white w-5 h-5 rounded-full flex items-center justify-center text-sm">
                                +
                            </div>
                        )}
                    </div>

                    <div>
                        <h4 className="text-white text-sm">
                            {status.name}
                        </h4>

                        <p className="text-[#8696a0] text-xs">
                            {status.time}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StatusList;