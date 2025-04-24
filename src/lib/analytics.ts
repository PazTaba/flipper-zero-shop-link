
import { supabase } from "@/integrations/supabase/client";

export const trackPageView = async (pagePath: string) => {
  const { data: clientInfo } = await supabase.functions.invoke('get-client-info');
  
  await supabase.from('page_views').insert({
    page_path: pagePath,
    user_agent: clientInfo?.userAgent,
    ip_address: clientInfo?.ipAddress
  });
};

export const trackProductInteraction = async (productId: string, interactionType: 'view' | 'detail_view' | 'add_to_cart') => {
  await supabase.from('product_interactions').insert({
    product_id: productId,
    interaction_type: interactionType
  });
};

export const getAnalytics = async () => {
  const now = new Date();
  const last7Days = new Date(now.setDate(now.getDate() - 7)).toISOString();

  const [{ data: pageViews }, { data: productInteractions }] = await Promise.all([
    supabase.from('daily_page_views')
      .select('*')
      .gte('day', last7Days),
    supabase.from('daily_product_interactions')
      .select('*')
      .gte('day', last7Days)
  ]);

  return {
    pageViews: pageViews || [],
    productInteractions: productInteractions || []
  };
};
