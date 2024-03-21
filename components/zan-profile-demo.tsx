import React from "react";
import { ZanProfile } from "./zan-profile";
import { BotCard } from "./llm-stocks";

export function ZanProfileDemo():React.ReactNode {
    return <BotCard>
        <ZanProfile firstName="" lastName="" />
    </BotCard>
}