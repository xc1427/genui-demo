import React from "react";
import { ZanProfile } from "./zan-profile";
import { ZanProfileAntd } from "./zan-profile-antd";
import { BotCard } from "./llm-stocks";

export function ZanProfileDemo():React.ReactNode {
    return <BotCard>
        <ZanProfileAntd firstName="" lastName="" />
    </BotCard>
}