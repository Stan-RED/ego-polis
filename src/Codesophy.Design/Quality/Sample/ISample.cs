﻿using Codesophy.Model;

namespace Codesophy.Quality.Sample
{
    /// <summary>
    /// TODO:Samples are an ubiquituos language for business "instances".
    /// </summary>
    /// <remarks>
    /// TODO: Refering to the "Coach Carter" movie and his samples: "Today's
    /// flavor: offense. Now I have a sister. Her name's Linda. Linda is smart,
    /// she's political. Well, actually, she's radical. Linda's got a big afro.
    /// Linda is our pick-and-roll offense."
    /// 
    /// TODO:Probably it should implements IHaveUniqueName?
    /// </remarks>
    public interface ISample : IHasName
    {
        /// <summary>
        /// TODO:May be some "document" model?
        /// </summary>
        string Description { get; }

        /// <summary>
        /// TODO:Real-world samples may be used for deployment. Better to define
        /// environments, so I can mark that it will be applicable for Prod+Staging
        /// for example. May be int value that can be used for enum flags and for
        /// levels (dev->staging->production). But also string[].
        /// </summary>
        bool IsRealWorld { get; }
    }
}
