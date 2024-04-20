# Generate ads

<p>this feature is resposible for generating ads from scrapted article</p>

## Decision Points and Reasoning

<p>the implementation flow is as follows</p>

- get article link from article collection, if the is not article
  get/score more articles from JSON API.
- scrap article content and generate ads from the scrapted content.
- store generated ads with major keys: **source article, businessId, status, text**

<span style="color: yellow">status should be active by default, text is the generate ads</span>

## Generated ad data model

```
const AdPropmotionContent = new Schema<IAdPromotionContent>(
  {
    sourceArticle: { type: ObjectId, ref: "BusinessArticles" },
    text: { type: String },
    businessId: { type: ObjectId, ref: "UserBusiness" },
    status: { type: "String", default: adContentStatus.ACTIVE },
  },
  {
    timestamps: true,
  }
);
```
